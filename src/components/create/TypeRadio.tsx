import { RadioGroup } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { BoltIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const types = [
    {
        icon: <BoltIcon className='w-5 h-5' />,
        name: 'Rýchla',
        description: 'Záujemca uvidí pri ponuke poslednú ponuknutú cenu.',
        type: 0,
    },
    {
        icon: <EyeSlashIcon className='w-5 h-5' />,
        name: 'Tichá',
        description: 'Záujemca neuvidí ponuknutú cenu. Môže ponúknuť cenu, ktorá je podľa neho adekvátna.',
        type: 1,
    },
]

type TypeFieldProps = {
    changeType: (type: any) => void
}

export const TypeRadio: FC<TypeFieldProps> = ({ changeType }) => {
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
                    Typ dražby
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
                                        <span className="text-sm">
                                            {type.description}
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