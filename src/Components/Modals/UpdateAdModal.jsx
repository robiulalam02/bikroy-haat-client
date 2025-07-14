import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { uploadImageToImgBB } from '../../API/utils';
import Spinner from '../Loaders/Spinner';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

export default function UpdateAdModal({ isOpen, closeModal, adData, onUpdate, refetch }) {

    const [productImage, setProductImage] = useState("");
    const [imgLoading, setImgLoading] = useState(false);

    const { register, handleSubmit, reset, errors } = useForm({
        defaultValues: {
            title: adData?.title || '',
            description: adData?.description || '',
            image: adData?.image || '',
        },
    });

    // when product.image becomes available, set it in state
    useEffect(() => {
        if (adData?.image) {
            setProductImage(adData.image);
        }
    }, [adData]);

    const handleUploadPhoto = async (photo) => {
        console.log(photo)

        try {
            setImgLoading(true)
            const res = await uploadImageToImgBB(photo)
            const imageURL = res.data.data.display_url
            if (imageURL) {
                setProductImage(imageURL)
            }
        } catch {
            setImgLoading(false)
            console.log('image upload failed')
        } finally {
            setImgLoading(false)
        }
    }

    useEffect(() => {
        if (adData && isOpen) {
            reset({
                title: adData.title,
                description: adData.description,
                image: adData.image,
            });
        }
    }, [adData, isOpen, reset]);

    const onSubmit = async (data) => {
        const updatedAdData = {
            ...data,
            image: productImage
        }

        onUpdate(updatedAdData)
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                >
                                    Update Advertisement
                                </Dialog.Title>

                                <motion.form
                                    onSubmit={handleSubmit(onSubmit)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium">Ad Title</label>
                                        <input
                                            {...register('title', { required: true })}
                                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Short Description</label>
                                        <textarea
                                            {...register('description', { required: true })}
                                            className="w-full border-b border-gray-300 focus:outline-none py-2"
                                            rows={3}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">Advertisement Image</label>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={e => handleUploadPhoto(e.target.files[0])}
                                                className="w-full border-b border-gray-300 py-2 file:bg-primary file:text-white file:rounded file:px-4 file:py-1 file:border-none file:mr-4 file:font-medium file:cursor-pointer"
                                            />

                                            {
                                                imgLoading &&
                                                <Spinner />
                                            }
                                        </div>
                                    </div>


                                    <div className="mt-6 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            disabled={imgLoading}
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </motion.form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
