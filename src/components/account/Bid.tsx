import { FC } from "react";

export const Bid: FC = () => {
    const renderRecords = () => {
        return null;
    }

    return (
        <div className="space-y-2">
            <div className="text-xl">
                Moje cenové ponuky
            </div>
            <div className="space-y-4">
                {renderRecords()}
            </div>
        </div>
    )
}