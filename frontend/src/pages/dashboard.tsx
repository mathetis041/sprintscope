import { Menu, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { VideoContext } from "../useContext/videoContext";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const { videoData, videos } = useContext(VideoContext);


    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.currentTime = 0;
                video.muted = true;
                video.play();

                const stopAfter5Sec = setTimeout(() => {
                    video.pause();
                }, 5000);

                return () => clearTimeout(stopAfter5Sec);
            }
        });
    }, [videos]);

    const sortedVideos = [...videos].sort((a, b) => {
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
    });


    return (
        <>
            <nav className="bg-[#1E3A8A] text-white shadow-md relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-bold">
                            Sprint<span className="text-[#F97316]">Scope</span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/" className="hover:underline">Athletes</Link>
                            <Link to="/" className="hover:underline">Add Athletes</Link>
                            <Link to="/" className="hover:underline">Settings</Link>
                            <Link
                                to="/dashboard"
                                className="text-white bg-[#F97316] px-4 py-1.5 rounded-sm font-semibold shadow hover:bg-white hover:text-[#1E3A8A] transition"
                            >
                                {videoData.athleteName || "Coach Smith"}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="focus:outline-none">
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav Links as Overlay */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#1E3A8A] px-4 py-4 space-y-3 flex flex-col shadow-md z-50">
                        <Link to="/" className="hover:underline">Athletes</Link>
                        <Link to="/" className="hover:underline">Add Athletes</Link>
                        <Link to="/" className="hover:underline">Settings</Link>
                        <button className="text-white bg-[#F97316] px-4 py-1.5 rounded-sm font-semibold shadow hover:bg-white hover:text-[#1E3A8A] transition">
                            {videoData.athleteName || "Coach Smith"}
                        </button>
                    </div>
                )}
            </nav>


            <div className="p-5">
                <div>
                    <h3 className="text-[#1F2937] text-lg font-bold">Welcome back, Coach Smith</h3>
                    <p className="text-[#6B7280] text-sm">
                        Continue your analysis or upload new video for your athletes.
                    </p>

                    <div className="flex justify-between mt-10">
                        <p className="text-[#1F2937] text-lg font-bold">Recent Videos</p>
                        <Link to="/uploadvideo" className="bg-[#F97316] text-white text-sm py-2 px-4 rounded-md hover:bg-orange-500 transition">
                            Upload New Video
                        </Link>
                    </div>

                    <div className="mt-6 w-full flex flex-wrap gap-6">
                        {sortedVideos.length > 0 ? (
                            sortedVideos.map((video, index) => (
                                <div key={index} className="w-80 h-60 p-4 rounded-lg shadow-md bg-white">
                                    <video
                                        src={video.src}
                                        className="w-full h-40 object-cover rounded"
                                        controls
                                    />
                                    <p className="mt-2 text-lg font-semibold text-[#333333]">{video.title}</p>
                                    <p className="text-sm text-gray-400">Uploaded {video.date}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">No recent videos yet.</p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="my-5">
                        <p className="text-[#1F2937] text-lg font-bold">Your Athletes</p>
                    </div>

                    <div className="mt-8 w-full flex flex-wrap gap-6">
                        {sortedVideos.length > 0 ? (
                            <div className="w-80 h-60 p-4 rounded-lg shadow-lg bg-white">
                                <video
                                    ref={(el: HTMLVideoElement | null) => {
                                        videoRefs.current[0] = el;
                                    }}
                                    src={sortedVideos[0].src}
                                    className="w-full aspect-video rounded"
                                    muted
                                    playsInline
                                />
                                <p className="mt-2 text-lg font-semibold text-[#333333]">{sortedVideos[0].title}</p>
                                <p className="text-sm text-gray-400">{sortedVideos[0].date}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No uploaded video yet.</p>
                        )}


                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
