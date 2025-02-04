import clsx from 'clsx';
import React, { PropsWithChildren, useState } from 'react';
import { LuFilePlus2 } from 'react-icons/lu';
import { readExcelFile } from '../helpers/readExcelFile';

const validFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

const validFormat = ['.xlsx', '.xls'];

type FilePickerProps = PropsWithChildren<{
    onLoadSuccess: (participants: string[][], file: File) => void;
    onLoadError?: (error: Error) => void;
}>

const FilePicker = ({ onLoadSuccess, onLoadError, children }: FilePickerProps) => {
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        participantsFromFile(e.dataTransfer.files![0]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        participantsFromFile(e.target.files![0]);
    };

    const participantsFromFile = (file: File) => {
        if (!file) return;
        if (!validFileTypes.includes(file.type)) {
            console.log('Invalid file type');
            return;
        }
        readExcelFile(file).then((data) => {
            onLoadSuccess(data, file);
        }).catch((error) => {
            console.error(error);
            onLoadError?.(error);
        });
    }

    return (
        <div>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
                className="transition-all flex flex-col items-center justify-center w-full md:min-w-xs lg:min-w-sm p-3 sm:p-4 md:p-5 rounded-3xl lg:rounded-4xl bg-gray-50/30 dark:bg-gray-700/70 hover:bg-gray-100 dark:border-gray-600/50 dark:hover:border-gray-500 dark:hover:bg-gray-800 backdrop-blur-md"
            >
                {children}
                <div
                    className={
                        clsx(
                            "flex flex-col items-center w-full justify-center",
                            `transition-all p-2 sm:p-3 md:h-64 border-dashed border md:border-2 rounded-2xl cursor-pointer dark:border-gray-400 border-gray-500`,
                            { 'border-blue-500!': dragging }
                        )
                    }
                >
                    <input
                        id="fileInput"
                        type="file"
                        accept={validFormat.join(",")}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className={clsx("text-center", {"animate-bounce":dragging})}>
                        <LuFilePlus2 size={45} className='mx-auto text-gray-600 dark:text-gray-400 -mt-7 inline-block md:block md:mb-6' />
                        <div className='inline-block ps-3 lg:ps-0'>
                            <p className="mb-2 text-gray-600 dark:text-gray-300">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className=" text-gray-600 dark:text-gray-300">
                                Excel files only (.xlsx, .xls)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilePicker;
