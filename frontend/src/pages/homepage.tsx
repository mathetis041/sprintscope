import { Link } from "react-router-dom";

type Feature = {
    number: string;
    title: string;
    description: string;
};

type Review = {
    name: string;
    location: string;
    review: string;
}

const Reviews: Review[] = [
    {
        name: "Sarah Johnson",
        location: "Coach at Melbourne university",
        review: "This platform has transformed how we work, the features are exactly what we need."
    },
    {
        name: "Emily Carter",
        location: "Data Analyst at market insights",
        review: "This analytic tools provided insightful dat that improved our decision-making."
    },
    {
        name: "Michael Lee",
        location: "Product Manager at Tech Innovations",
        review: "I love the intuision design, it make collaboration so much esier"
    },
    {
        name: "David Kim",
        location: "Operation Director at Creative Solutions",
        review: "Seamless inteegration with other tools has boosted our productivity tremendously."
    }
]

const Features: Feature[] = [
    {
        number: "1",
        title: "Upload Sprint Videos",
        description: "Easily upload videos of your athletes' 100m for detailed analysis. Our system surpports all common video formats."
    },
    {
        number: "2",
        title: "Analyze Frame-by-Frame",
        description: "Break down every aspect of sprint technique with our frame-by-frame analysis tools. Focus on posture, arm movement, foot placement, and more."
    },
    {
        number: "3",
        title: "Compare & Improve",
        description: "Compare your athletes' technique with professional sprinters, track improvement all the time, and provide detailed feedback directly on the video."
    }
]


const Homepage = () => {
    return (
        <div className="pt-5 bg-[#F1F5F9]">
            <div className="md:flex gap-5 px-5 md:pb-5 lg:justify-between xl:px-16">
                <div className="mb-5 md:w-lg md:mt-10 lg:w-1/3">
                    <h2 className="text-[#1E3A8A] font-extrabold text-lg mb-2 md:mb-5 lg:text-xl xl:text-2xl">Analyze sprint techniques like<br /> never before</h2>
                    <p className="text-sm mb-3 text-[#6B7280] md:mb-10 lg:text-lg lg:leading-8 xl:text-xl">SprintScope gives coaches the tools to analyze, annotate, and improve athlete performance with frame-by-frame video analysis for 100m sprint.</p>
                    <Link to="/signup" className="bg-[#F97316] text-white px-6 py-2 rounded-md lg:text-lg xl:px-8 xl:py-3">
                        Get Started
                    </Link>
                </div>
                <div className="flex justify-center items-center">
                    <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1749746473/Rectangle_14_do17mx.png" alt="Sprint Analysis" className="md:hidden" />
                    <img src="https://res.cloudinary.com/doijevrqo/image/upload/v1749746465/Rectangle_13_ftohss.png" alt="Sprint analysis" className="hidden md:block" />
                </div>
            </div>
            <div className="py-5 mt-5 rounded-md bg-white shadow-t-md xl:px-16">
                {Features.map((feature: Feature, index: number) => (
                    <div key={index} className="mb-6 md:mt-5 xl:mt-7 xl:mb-10">
                        <div className="flex items-start px-5 space-x-4 md:w-1/2">
                            <div className="text-2xl font-bold bg-[#1E3A8A] text-white p-5 rounded-full flex items-center justify-center w-12 h-12">
                                {feature.number}
                            </div>
                            <div>
                                <h3 className="text-[#1E3A8A] text-lg font-semibold">{feature.title}</h3>
                                <p className="text-sm text-[#6B7280]">{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg font-bold text-center text-[#1F2937]">Trusted by Thousands of Coaches</h2>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-20 xl:px-10">
                    {Reviews.map((review: Review, index: number) => (
                        <div key={index} className="rounded-xl shadow-md p-6 bg-white border border-gray-100">
                            <p className="text-md text-gray-600 mb-4 italic">"{review.review}"</p>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                                <p className="text-sm text-gray-500">{review.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[url('https://res.cloudinary.com/doijevrqo/image/upload/v1749746449/Rectangle_4_1_iwu2ct.png')] text-white flex flex-col items-center justify-center bg-cover bg-no-repeat h-72 w-full">
                <h2 className="text-3xl">Ready to Get Started?</h2>
                <p className="text-center text-lg my-5">Join thousands of satisfied coaches and take your training to the next level</p>
                <Link to="signup" className="bg-[#F97316] text-white px-10 py-2 rounded-md">
                    Sign in
                </Link>
            </div>

        </div>
    )
}

export default Homepage