import { useState } from 'react'
import * as XLSX from 'xlsx';
import { Participant } from '../App';

type Props = {
    callback: (list: Array<Participant>) => void
}

const UploadFile = ({ callback }: Props) => {
    // const [names, setNames] = useState<string[]>([]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            readFile(event.target.files[0])
        }
    }

    const readFile = async (file: FileList[0]) => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = async (e: ProgressEvent<FileReader>) => {
            const data = e.target ? e.target.result : '';
            const workbook = XLSX.read(data as any, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const l: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            callback(l)
            // setNames(l.map((row: any) => `${row.Nombres} ${row.Apellidos}`)); // Assuming 'Name' is the column header for the names
        };

        fileReader.readAsBinaryString(file);
    };


    return (
        <div>
            <input className='' type="file" onChange={handleFileUpload} />
        </div>
    )
}

export default UploadFile