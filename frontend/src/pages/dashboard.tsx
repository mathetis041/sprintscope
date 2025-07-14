const Dashboard = () => {
    return (
        <div className="">
            <div className="p-5">
                <div>
                    <h3 className="text-[#1F2937] text-lg font-bold">Welcome back, Coach Smith</h3>
                    <p className="text-[#6B7280] text-sm">Continue your analysis or upload new video for your athletes.</p>
                    <div className="flex justify-between mt-10">
                        <p className="text-[#1F2937] text-lg font-bold">Recent Videos</p>
                        <button className="bg-[#F97316] text-white text-sm py-2 px-2 rounded-md">Upload New Video</button>
                    </div>
                </div>
                <div>
                    <video src="" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard