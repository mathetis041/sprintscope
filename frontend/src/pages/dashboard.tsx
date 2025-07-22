import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { videoData } from "./index";

const Dashboard = () => {

    type Video = {
        src: string;
        title?: string;
        date?: string;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [recentVideos, setRecentVideos] = useState<Video[]>([]);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleVideoPlay = (video: Video) => {
        // Avoid duplicates
        setRecentVideos((prev) => {
            const alreadyExists = prev.find((v) => v.src === video.src);
            if (!alreadyExists) {
                return [video, ...prev.slice(0, 4)]; // Keep max 5 recent videos
            }
            return prev;
        });
    };

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
    }, []);

    return (
        <>
            <nav className="bg-[#1E3A8A] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 text-xl font-bold">Sprint<span className="text-[#F97316]">Scope</span></div>
                        <div className="hidden md:flex space-x-6 items-center">
                            <a href="#" className="hover:underline">Athletes</a>
                            <a href="#" className="hover:underline">Add Athlete</a>
                            <a href="#" className="hover:underline">Settings</a>
                            <button className="text-white bg-[#F97316] px-4 py-1.5 rounded-sm font-semibold shadow hover:bg-gray-100 transition">
                                Coach Smith
                            </button>
                        </div>
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="focus:outline-none">
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-[#1E3A8A]">
                        <a href="#" className="block hover:underline">Athletes</a>
                        <a href="#" className="block hover:underline">Add Athlete</a>
                        <a href="#" className="block hover:underline">Settings</a>
                        <button className="w-full text-left bg-white text-[#1E3A8A] px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
                            Coach Smith
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
                        {recentVideos.length > 0 ? (
                            recentVideos.map((video, index) => (
                                <div key={index} className="w-80 h-60 p-4 rounded-lg shadow-md bg-white">
                                    <video
                                        src={video.src}
                                        className="w-full aspect-video rounded"
                                        controls
                                    />
                                    <p className="mt-2 text-lg font-semibold text-[#333333]">{video.title}</p>
                                    <p className="text-sm text-gray-400">{video.date}</p>
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
                        {videoData.length > 0 ? (
                            videoData.map((video, index) => (
                                <div key={index} className="w-80 h-60 p-4 rounded-lg shadow-lg bg-white">
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        src={video.src}
                                        className="w-full aspect-video rounded"
                                        muted
                                        playsInline
                                        onPlay={() => handleVideoPlay(video)}
                                    />
                                    <p className="mt-2 text-lg font-semibold text-[#333333]">{video.title}</p>
                                    <p className="text-sm text-gray-400">{video.date}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 mt-10">Loading video...</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
