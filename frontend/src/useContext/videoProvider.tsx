import React, { useEffect, useState } from "react";
import { VideoContext, type VideoData, type VideoItem } from "./videoContext";

interface VideoProviderProps {
    children: React.ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
    const [videoData, setVideoDataState] = useState<VideoData>({
        videoTitle: "",
        athleteName: "",
        videoDate: "",
        note: "",
        videoFile: null,
    });

    const [videos, setVideos] = useState<VideoItem[]>([]);

    type StoredVideo = {
        videoURL: string;
        videoTitle: string;
        athleteName: string;
        videoDate: string;
    };

    useEffect(() => {
        try {
            const saved = localStorage.getItem("athleteVideos");
            if (saved) {
                const parsed: StoredVideo[] = JSON.parse(saved);

                // Validate and transform safely
                const formatted: VideoItem[] = parsed
                    .filter((v) => v.videoURL && v.videoTitle && v.athleteName && v.videoDate)
                    .map((v) => ({
                        src: v.videoURL,
                        title: v.videoTitle,
                        athlete: v.athleteName,
                        date: v.videoDate,
                    }));

                setVideos(formatted);
            }
        } catch (error) {
            console.error("Error parsing videos from localStorage:", error);
        }
    }, []);


    const setVideoData = (data: Partial<VideoData>) => {
        setVideoDataState((prev) => ({
            ...prev,
            ...data,
        }));
    };

    return (
        <VideoContext.Provider value={{ videoData, setVideoData, videos, setVideos }}>
            {children}
        </VideoContext.Provider>
    );
};
