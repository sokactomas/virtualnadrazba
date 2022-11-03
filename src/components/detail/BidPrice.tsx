import { ClockIcon, HandRaisedIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/solid";
import { useDuration } from "hooks/duration";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import { trpc } from "utils/trpc";

type BidPriceProps = {
    record?: {
        userId?: number,
        validUntil?: Date,
        id?: number,
        price?: number,
        bidPrice?: number,
        type?: number
    }
}

export const BidPrice: FC<BidPriceProps> = ({ record }) => {
    const [price, setPrice] = useState<string>('');
    const { data: session } = useSession();

    const [currentPrice, setCurrentPrice] = useState<number>();

    useEffect(() => {
        const newPrice = record?.type === 0 && record?.bidPrice ? record?.bidPrice : record?.price
        setCurrentPrice(newPrice || 0)
    }, [record])

    const recordMutation = trpc.record.fastBid.useMutation({
        onMutate() {
            setPrice('')
        },
    });

    trpc.record.onUpdate.useSubscription(undefined, {
        onData(r) {
            setCurrentPrice(r?.bidPrice)
        }
    })

    const handleOnSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const data = {
            price: parseInt(price),
            recordId: record?.id as number, 
            userId: session?.user?.id as number,
        };
        
        await recordMutation.mutateAsync(data);
    }

    const {
        setTime,
        duration
    } = useDuration();

    useEffect(() => {
        setTime(record?.validUntil)
    }, [record, setTime])

    const renderDuration = () => {
        if (duration) {
            return (
                <span>
                    {duration.days()} dní {duration.hours()}:{duration.minutes()}:{duration.seconds()}
                </span>
            )
        }
        return (
            <div>
                - Dní --:--:--
            </div>
        );
    }

    const renderPrice = () => {
        if (record?.type === 0 && record?.bidPrice) {
            return (
                <div className="flex flex-col items-start">
                    <span>Min. ponúknutá suma</span>
                    <div className="flex items-center space-x-2">
                        <TagIcon className="w-5 h-5 text-red-600" />
                        <span className="block font-bold text-xl">{(currentPrice || 0).toLocaleString()} €</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="flex flex-col items-start">
                <span>Vyvolavacia cena</span>
                <div className="flex items-center space-x-2">
                    <TagIcon className="w-5 h-5 text-red-600" />
                    <span className="block font-bold text-xl">{(record?.price || 0).toLocaleString()} €</span>
                </div>
            </div>
        )
    }

    if(!session) {
        return (
            <div className="bg-sky-50 text-sky-800 p-4 border border-sky-400 flex items-center space-x-4">
                <IdentificationIcon className="w-12 h-12" />
                <span>Ak chcete dražiť vozidlo je nutné <span className="font-semibold">sa prihlásiť</span>.</span>
            </div>
        )
    }

    if (record?.userId && record?.userId === session?.user?.id) {
        return (
            <div className="bg-sky-50 text-sky-800 p-4 border border-sky-400 flex items-center space-x-4">
                <HandRaisedIcon className="w-12 h-12" />
                <span>Vaše vlastné vozidlo <span className="font-semibold">nemôžete</span> dražiť. <Link className="underline" href={"/account"}>Prejsť do ponuky.</Link></span>
            </div>
        )
    }

    return (
        <div className="rounded-md border p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <span>Aukcia končí za</span>
                    <div className="flex items-center space-x-2">
                        <ClockIcon className="w-5 h-5" />
                        <span className="block font-bold text-md">
                            {renderDuration()}
                        </span>
                    </div>
                </div>
                { renderPrice() }
            </div>
            <div className="text-sm">
                Najmenšia čiastka, ktorá sa da prihodiť je <span className="font-semibold">100 €</span>
            </div>
            <form className="space-y-4" onSubmit={handleOnSubmit}>
                <div className="col-span-3 sm:col-span-2">
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">€</span>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" className="block w-full p-2 rounded-none rounded-r-md border border-gray-300 sm:text-sm" placeholder={String((currentPrice || 0) + 100)} />
                    </div>
                </div>
                <button type="submit" className="button-primary w-full" disabled={!price || parseInt(price) <= ((currentPrice || 0) + 99)}>Prihodiť na vozidlo</button>
            </form>
        </div>
    )
}