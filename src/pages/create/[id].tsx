import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";
import { TypeRadio } from "~/components/create/TypeRadio";
import { trpc } from "~/utils/trpc";
import { NextPageWithLayout } from "../_app";

const CreateRecord: NextPageWithLayout = () => {
    const { data: session } =  useSession();
    const router = useRouter();

    const [price, setPrice] = useState<number>(100);
    const [type, setType] = useState<number>(0);
    
    const title = 'Volkswagen Passat Variant 2.0 TDI BMT Comfortline DSG';

    const addRecord = trpc.record.create.useMutation({
        onSuccess() {
            router.push("/account", undefined, { shallow: true })
        }
    });

    const handleOnSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();

        await addRecord.mutateAsync({
            title,
            price,
            type,
            userId: session?.user?.id as number,
            platformId: router?.query?.id as string
        })
    }

    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className="text-2xl font-semibold">
                Pridať do dražby
            </div>
            <span className='text-gray-600 text-sm'>
                Od pridania do dražby Vás delí už len posledný krok.
            </span>

            <div className="space-y-2">
                <div className="font-bold text-xl">
                    { title }
                </div>
                <form className="space-y-2" onSubmit={handleOnSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="starting-price" className='block mb-2 text-sm font-medium text-gray-900'>
                            Vyvolavacia cena
                        </label>
                        <input value={price} onChange={(e) => setPrice(parseInt(e.target.value))} type="number" id="starting-price" placeholder='Vyvolavacia cena' className='border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 field-outline-ring'/>
                        <span className="text-sm bg-sky-100 w-full flex px-4 py-2 rounded-lg text-sky-900">
                            Ideálna vyvolavacia cena: <span className="font-semibold">13 490 €</span>
                        </span>
                    </div>
                    <div className="space-y-2">
                        <TypeRadio changeType={setType} />
                    </div>
                    <div className="flex justify-end w-full">
                        <button type="submit" className="button-primary">
                            Pridať do dražby
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRecord;