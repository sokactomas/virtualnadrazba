import { Offer } from "~/components/account/Offer";
import { Record } from "~/components/create/Record";
import { NextPageWithLayout } from "~/pages/_app";

const Create: NextPageWithLayout = () => {
    return (
        <div className="w-full lg:w-4/5 py-2 px-5 lg:p-0 space-y-4">
            <div className="text-2xl font-semibold">
                Pridať do dražby
            </div>
            <span className='text-gray-600 text-sm'>
                Vyberte si spomedzi svojích inzerátov, ktorý inzerát chcete pridať do dražby.
            </span>

            <Offer />
        </div>
    )
}

export default Create;