import { PropsWithChildren, useState } from "react"
import Modal from "./Modal"
import { IoInformationCircle } from "react-icons/io5"

type HowToUseProps = PropsWithChildren

const HowToUse = ({ children }: HowToUseProps) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="How to Use Lottery"
                icon={<IoInformationCircle size={24} className="text-indigo-500" />}
                iconBgColor="bg-blue-100"
            >
                <div className="text-gray-600 text-wrap">

                    <div className="space-y-4">
                        <div>
                            <h5 className=" font-poetsen text-gray-700">1. Add Participants</h5>
                            <p className="text-sm pl-4">
                                - Upload Excel file (.xlsx, .xls) with participant list, or<br />
                                - Enter names manually, one per line
                            </p>
                        </div>

                        <div>
                            <h5 className=" font-poetsen text-gray-700">2. Configure Settings</h5>
                            <p className="text-sm pl-4">
                                - Adjust timer duration (5-120 seconds)<br />
                                - Toggle sound effects<br />
                                - Change animation speed
                            </p>
                        </div>

                        <div>
                            <h5 className=" font-poetsen text-gray-700">3. Start the Draw</h5>
                            <p className="text-sm pl-4">
                                - Click the PLAY button to begin<br />
                                - Watch names shuffle during countdown<br />
                                - Pause/Resume with play/pause button
                            </p>
                        </div>

                        <div>
                            <h5 className=" font-poetsen text-gray-700">4. Winner Selection</h5>
                            <p className="text-sm pl-4">
                                - Timer will count down to zero<br />
                                - Winner is randomly selected<br />
                                - Celebration animation plays
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default HowToUse