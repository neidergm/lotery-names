import { PropsWithChildren, useState } from "react"
import Modal from "./Modal"
import { IoShieldCheckmarkOutline } from "react-icons/io5"

type PrivacyPolicyProps = PropsWithChildren

const PrivacyPolicy = ({ children }: PrivacyPolicyProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Privacy Policy"
                icon={<IoShieldCheckmarkOutline size={24} className="text-green-500" />}
                iconBgColor="bg-green-100"
            >
                <div className="text-gray-600 space-y-4 text-wrap">
                    <section>
                        <h4 className="font-poetsen mb-2">Data Collection</h4>
                        <p className="text-sm">
                            We do not collect any personal information. The participant data you enter is stored locally on your device and is not transmitted to any servers.
                        </p>
                    </section>

                    <section>
                        <h4 className="font-poetsen mb-2">Local Storage</h4>
                        <p className="text-sm">
                            Your preferences (sound settings, animation speed, etc.) are saved in your browser's local storage for convenience. This data never leaves your device.
                        </p>
                    </section>

                    <section>
                        <h4 className="font-poetsen mb-2">Cookies</h4>
                        <p className="text-sm">
                            This application does not use cookies or tracking mechanisms.
                        </p>
                    </section>

                </div>
            </Modal>
        </>
    )
}

export default PrivacyPolicy