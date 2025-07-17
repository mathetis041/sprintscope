import { videoData } from "./index";

const Dashboard = () => {
    return (
        <div className="p-5">
            <div>
                <h3 className="text-[#1F2937] text-lg font-bold">Welcome back, Coach Smith</h3>
                <p className="text-[#6B7280] text-sm">
                    Continue your analysis or upload new video for your athletes.
                </p>

                <div className="flex justify-between mt-10">
                    <p className="text-[#1F2937] text-lg font-bold">Recent Videos</p>
                    <button className="bg-[#F97316] text-white text-sm py-2 px-4 rounded-md hover:bg-orange-500 transition">
                        Upload New Video
                    </button>
                </div>
            </div>

            <div className="mt-8 space-y-12">
                {videoData.length > 0 ? (
                    videoData.map((video, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-lg">
                            <video
                                src={video.src}
                                title={video.title}
                                controls
                                className="w-full aspect-video rounded"
                            />
                            <p className="mt-4 text-lg font-semibold text-[#333333]">{video.title}</p>
                            <p className="mt-1 text-sm text-gray-400">{video.date}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-10">Loading video...</div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
