import { useEffect, useRef } from "react"
import { useConfigStore } from "../store/configStore"

export const useAudio = (audioPath: string) => {
    const { sound } = useConfigStore()
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio(audioPath)

        const handleError = (error: ErrorEvent) => {
            console.error('Audio loading error:', error)
        }

        if (audioRef.current) {
            audioRef.current.addEventListener('error', handleError)
            audioRef.current.volume = sound ? 1 : 0
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('error', handleError)
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [audioPath])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = sound ? 1 : 0
        }
    }, [sound])

    const play = async () => {
        if (sound && audioRef.current) {
            try {
                await audioRef.current.play()
            } catch (error) {
                console.error('Playback error:', error)
            }
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause()
        }
    }

    return { play, pause }
}

export default useAudio