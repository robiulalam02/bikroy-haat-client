import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'

const ShowRejectionTextModal = ({ isOpen, setIsOpen, selectedFeedback }) => {
    function close() {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-xs">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-base-200 shadow p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                            Admin Feedback
                        </DialogTitle>
                        <p className="mt-2 text-sm/6 text-gray-600">
                            {selectedFeedback}
                        </p>
                        <div className="mt-4">
                            <Button
                                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-primary/90 data-open:bg-gray-700"
                                onClick={close}
                            >
                                Got it, thanks!
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ShowRejectionTextModal
