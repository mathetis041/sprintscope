import { createContext, useContext } from "react";

export type VideoItem = {
    src: string;
    title?: string;
    athlete: string;
    date?: string;
};

export type VideoData = {
    videoTitle: string;
    athleteName: string;
    videoDate: string;
    note: string;
    videoFile: File | null;
};

export type VideoContextType = {
    videoData: VideoData;
    setVideoData: (data: Partial<VideoData>) => void;
    videos: VideoItem[];
    setVideos: (videos: VideoItem[]) => void;
};

export const VideoContext = createContext<VideoContextType>({
    videoData: {
        videoTitle: "",
        athleteName: "",
        videoDate: "",
        note: "",
        videoFile: null,
    },
    setVideoData: () => { },
    videos: [],
    setVideos: () => { },
});

export const useVideoContext = () => useContext(VideoContext);
