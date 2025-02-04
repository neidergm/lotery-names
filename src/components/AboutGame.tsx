import { PropsWithChildren, useState } from "react"
import Modal from "./Modal"
import { IoGameController } from "react-icons/io5"

type AboutGameProps = PropsWithChildren

const AboutGame = ({ children }: AboutGameProps) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="About RaffleNG Game"
                icon={<IoGameController size={24} className="text-amber-500" />}
                iconBgColor="bg-amber-100"
            >
                <div className=" text-gray-600 text-wrap">
                    <h4 className="font-poetsen mb-2">What is RaffleNG?</h4>
                    <p className="text-sm mb-4">
                        RaffleNG is a free web application designed to randomly select winners from a list of participants. Perfect for contests, giveaways, and fair selection processes.
                    </p>

                    <h4 className="font-poetsen mb-2">Key Features</h4>
                    <ul className="text-sm list-disc list-inside mb-4">
                        <li>Import participants from Excel files</li>
                        <li>Manual participant entry option</li>
                        <li>Customizable animation speed</li>
                        <li>Adjustable timer settings</li>
                        <li>Sound effects (toggleable)</li>
                        <li>Winner celebration animations</li>
                        <li>Mobile-friendly interface</li>
                    </ul>

                    <h4 className="font-poetsen mb-2">How to Use</h4>
                    <ol className="text-sm list-decimal list-inside">
                        <li>Add participants via Excel or manual entry</li>
                        <li>Adjust timer and animation settings if desired</li>
                        <li>Click the Play button to start</li>
                        <li>Wait for the timer to complete</li>
                        <li>Celebrate the randomly selected winner!</li>
                    </ol>
                </div>
            </Modal>
        </>
    )
}

export default AboutGame