import * as XLSX from 'xlsx';

export const readExcelFile = async (file: File): Promise<string[][]> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });
                resolve(jsonData.slice(1));
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
};