import { Menu, X } from "lucide-react";
import { useState } from "react";

const UploadVideo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="bg-[#1E3A8A] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 text-xl font-bold">Sprint<span className="text-[#F97316]">Scope
                        </span>
                        </div>
                        <div className="hidden md:flex space-x-6 items-center">
                            <a href="#" className="hover:underline">Dashboard</a>
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
            <div>
                <div>
                    <h4>Upload New Sprint Video</h4>
                    <p>Upload a video of your athlete's sprint for detailed analysis.</p>
                </div>
                <div>

                </div>

            </div>
        </>
    )
}

export default UploadVideo