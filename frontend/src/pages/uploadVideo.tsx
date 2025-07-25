import { Menu, X } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { VideoContext, type VideoItem, useVideoContext } from "../useContext/videoContext";

const UploadVideo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


    // from the context i created
    const { videoData, setVideoData } = useContext(VideoContext);
    const { setVideos, videos } = useVideoContext();


    const toggleMenu = () => setIsOpen(!isOpen);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const files = e.dataTransfer.files;
        if (files.length) {
            setVideoData({ videoFile: files[0] });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoData({ videoFile: file });
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { videoTitle, athleteName, videoDate, note, videoFile } = videoData;


        if (!videoTitle || !athleteName || !videoDate || !videoFile) {
            alert("Please complete all required fields and upload a video.");
            return;
        }
        const videoURL = URL.createObjectURL(videoFile);

        const newVideo: VideoItem = {
            src: videoURL,
            title: videoTitle,
            athlete: athleteName,
            date: videoDate,
        };

        // Save to localStorage for persistence
        const existingData = JSON.parse(localStorage.getItem("athleteVideos") || "[]");
        const newLocalItem = {
            videoTitle,
            athleteName,
            videoDate,
            note,
            videoFileName: videoFile.name,
            videoURL,
        };
        localStorage.setItem("athleteVideos", JSON.stringify([...existingData, newLocalItem]));

        // Update context state
        setVideos([...videos, newVideo]);


        setVideoData({
            videoTitle: "",
            athleteName: "",
            videoDate: "",
            note: "",
            videoFile: null,
        })

        navigate("/dashboard");
    };

    return (
        <>
            <nav className="bg-[#1E3A8A] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-bold flex-shrink-0">
                            Sprint<span className="text-[#F97316]">Scope</span>
                        </div>
                        <div className="hidden md:flex space-x-6 items-center">
                            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                            <Link to="/settings" className="hover:underline">Settings</Link>
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
                    <div className="md:hidden absolute top-16 left-0 w-full bg-[#1E3A8A] px-4 py-4 space-y-3 flex flex-col shadow-md z-50">
                        <Link to="/" className="hover:underline">Dashboard</Link>
                        <Link to="/" className="hover:underline">Settings</Link>
                        <button className="text-white bg-[#F97316] px-4 py-1.5 rounded-sm font-semibold shadow hover:bg-white hover:text-[#1E3A8A] transition">
                            Coach Smith                        </button>
                    </div>
                )}
            </nav>

            {/* Upload Section */}
            <section className="max-w-4xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h4 className="text-2xl font-bold text-[#1E3A8A]">Upload New Sprint Video</h4>
                    <p className="text-gray-600">Upload a video of your athlete's sprint for detailed analysis.</p>
                </div>

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-10 text-center transition-all ${dragActive ? "border-orange-500 bg-orange-50" : "border-gray-300 bg-white"
                        }`}
                >
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1753146759/file_folder_btyhgh.png" alt="upload file" />
                        <p className="text-gray-500 mb-4">
                            Drag & drop your sprint video here,
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="text-[#6B7280] font-semibold hover:underline my-2 block"
                            >
                                or click to browse your file
                            </button>
                            <span className="block text-sm text-gray-400">Supports MP4, MOV, AVI up to 500MB</span>
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {videoData.videoFile && (
                        <p className="text-sm text-green-600 mt-2">
                            Selected: {videoData.videoFile.name}
                        </p>
                    )}
                </div>

                {/* Form */}
                <form className="mt-10 space-y-6 px-4 md:w-2/3 md:m-auto md:mt-16" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xl font-medium text-[#333333]">Video Title</label>
                        <input
                            type="text"
                            name="videoTitle"
                            value={videoData.videoTitle}
                            onChange={(e) => setVideoData({ videoTitle: e.target.value })}
                            placeholder="e.g. Sarah Ade final 100m"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#93C5FD] focus:border-[#93C5FD] p-5 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-medium  text-[#333333]">Select Athlete</label>
                        <input
                            name="athleteName"
                            type="text"
                            value={videoData.athleteName}
                            onChange={(e) => setVideoData({ athleteName: e.target.value })}
                            placeholder="Sarah Ade"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#93C5FD] placeholder-gray-400 focus:border-[#93C5FD] p-5"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-medium  text-[#333333]">Video Date</label>
                        <input
                            name="videoDate"
                            type="date"
                            value={videoData.videoDate}
                            onChange={(e) => setVideoData({ videoDate: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#93C5FD] focus:border-[#93C5FD] p-5"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-medium  text-[#333333]">Note (optional)</label>
                        <textarea
                            name="note"
                            value={videoData.note}
                            onChange={(e) => setVideoData({ note: e.target.value })}
                            placeholder="Any additional note"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#93C5FD] placeholder-gray-400 focus:border-[#93C5FD] p-5"
                            rows={4}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="bg-[#F97316] text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600 transition w-full"
                        >
                            Save and Continue to Analysis
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default UploadVideo;
