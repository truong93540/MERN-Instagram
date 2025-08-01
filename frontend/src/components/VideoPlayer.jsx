import React, { useEffect, useRef, useState } from 'react'
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'

const VideoPlayer = ({ media }) => {
    const videoTag = useRef()
    const [mute, setMute] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)

    const handleClick = () => {
        if (isPlaying) {
            if (videoTag.current) {
                videoTag.current.pause()
            }
            setIsPlaying(false)
        } else {
            if (videoTag.current) {
                videoTag.current.play()
            }
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                const video = videoTag.current
                if (entry.isIntersecting) {
                    if (video) {
                        video.play()
                        setIsPlaying(true)
                    }
                } else {
                    if (video) {
                        video.pause()
                        setIsPlaying(false)
                    }
                }
            },
            { threshold: 0.6 }
        )

        if (videoTag.current) {
            observer.observe(videoTag.current)
        }

        return () => {
            if (videoTag.current) {
                observer.unobserve(videoTag.current)
            }
        }
    }, [])

    return (
        <div className="h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
            <video
                src={media}
                autoPlay
                loop
                muted={mute}
                className="h-[100%] cursor-pointer w-full object-cover rounded-2xl"
                onClick={handleClick}
                ref={videoTag}></video>
            <div
                className="absolute bottom-[10px] right-[10px] "
                onClick={() => setMute((prev) => !prev)}>
                {!mute ? (
                    <IoVolumeHighOutline className="w-[20px] h-[20px] text-white font-semibold" />
                ) : (
                    <IoVolumeMuteOutline className="w-[20px] h-[20px] text-white font-semibold" />
                )}
            </div>
        </div>
    )
}

export default VideoPlayer
