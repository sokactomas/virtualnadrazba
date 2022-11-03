import { ClockIcon, HandRaisedIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { TagIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BaseSyntheticEvent, FC, useState } from "react";

type BidPriceProps = {
    id?: number,
    userId?: number,
    currentPrice?: number
}

export const BidPrice: FC<BidPriceProps> = ({ userId, id, currentPrice = 0 }) => {
    const [price, setPrice] = useState<string>('');

    const { data: session } = useSession();

    const handleOnSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        console.log({
            id, 
            price,
            userId: session?.user?.id
        });
    }

    if(!session) {
        return (
            <div className="bg-sky-50 text-sky-800 p-4 border border-sky-400 flex items-center space-x-4">
                <IdentificationIcon className="w-12 h-12" />
                <span>Ak chcete dražiť vozidlo je nutné <span className="font-semibold">sa prihlásiť</span>.</span>
            </div>
        )
    }

    if (userId && userId === session?.user?.id) {
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
                        <span className="block font-bold text-md">5 dní 20:30:40</span>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <span>Min. ponúknutá suma</span>
                    <div className="flex items-center space-x-2">
                        <TagIcon className="w-5 h-5 text-red-600" />
                        <span className="block font-bold text-xl">{currentPrice.toLocaleString()} €</span>
                    </div>
                </div>
            </div>
            <div className="text-sm">
                Najmenšia suma, ktorá sa da prihodiť je <span className="font-semibold">100 €</span>
            </div>
            <form className="space-y-4" onSubmit={handleOnSubmit}>
                <div className="col-span-3 sm:col-span-2">
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">€</span>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" className="block w-full p-2 rounded-none rounded-r-md border border-gray-300 sm:text-sm" placeholder={String(currentPrice + 100)} />
                    </div>
                </div>
                <button type="submit" className="button-primary w-full" disabled={!price || parseInt(price) <= (currentPrice + 99)}>Prihodiť na vozidlo</button>
            </form>
        </div>
    )
}