import { RadioGroup } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { BoltIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const types = [
    {
        icon: <EyeSlashIcon className='w-5 h-5' />,
        name: 'Aukcia C2C',
        description: 'Klient môže ponúknuť vozidlo do aukcie výhradne pre súkromných uživateľov.',
        info: 'obchodovanie na AB.EU najnižší poplatok',
        type: 0,
    },
    {
        icon: <BoltIcon className='w-5 h-5' />,
        name: 'Aukcia C2B',
        description: 'Klient môže ponúknuť vozidlo do aukcie výhradne pre autobazáre.',
        info: 'obchodovanie v ABM stredný poplatok',
        type: 1,
    },
    {
        icon: <EyeSlashIcon className='w-5 h-5' />,
        name: 'Aukcia Combo',
        description: 'V najvyššom balíku bude môcť klient ponúknuť svoje auto súkromníkom aj firmám.',
        info: 'obchodovanie na AB.EU a obchodovanie v ABM najvyšší poplatok',
        type: 2,
    },
]

type PackageRadioProps = {
    changeType: (type: any) => void
}

export const PackageRadio: FC<PackageRadioProps> = ({ changeType }) => {
    const [selectedType, setSelectedType] = useState(types[0]);

    useEffect(() => {
        changeType(selectedType.type);
    })

    const handleOnChange = (type: any) => {
        setSelectedType(type);
        changeType(type.type);
    }

    return (
        <div className='w-full'>
            <RadioGroup value={(selectedType)} onChange={(type) => handleOnChange(type)}>
                <RadioGroup.Label className='block mb-2 text-sm font-medium text-gray-900'>
                    Balík
                </RadioGroup.Label>
                <div className='flex flex-col space-y-2 lg:space-y-0 lg:flex-row w-full lg:space-x-2'>
                    {types?.map((type) => (
                        <RadioGroup.Option
                            key={type.name}
                            value={type}
                            className={({ active, checked }) =>
                                `${checked ? 'border-gray-900' : 'bg-white'} ${active ? 'field-outline-ring' : ''} flex flex-1 cursor-pointer rounded-lg border border-gray-300`
                            }>
                            {({ active, checked }) => (
                                <div className='w-full px-5 py-3 flex flex-col justify-evenly'>
                                    <div className="flex space-x-2 items-center">
                                        {type.icon}
                                        <RadioGroup.Label className={`font- ${checked ? 'text-black' : 'text-gray-700'}`} as='p'>
                                            {type.name}
                                        </RadioGroup.Label>
                                    </div>
                                    <RadioGroup.Description as='span'>
                                        <span className='space-y-2'>
                                            <span className="text-sm block">
                                                {type.description}
                                            </span>
                                            <span className="text-sm block">
                                                {type.info}
                                            </span>
                                        </span>
                                    </RadioGroup.Description>
                                </div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}