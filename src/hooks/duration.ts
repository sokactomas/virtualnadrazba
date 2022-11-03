import moment, { Duration } from "moment";
import { useEffect, useState } from "react";

export const useDuration = () => {
    const [duration, setDuration] = useState<Duration | null>(null);
    const [time, setTime] = useState<any>(null);

    useEffect(() => {
        let interval: any = null;
        interval = setInterval(() => {
            const now = moment();
            const mTime = moment(time);

            if (now.isBefore(mTime)) {
                setDuration(moment.duration(mTime.diff(now)));
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [time])

    return {
        setTime,
        duration,
    }
}