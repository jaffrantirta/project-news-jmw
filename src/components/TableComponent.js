import React from 'react'

export default function TableComponent({ data, heads }) {
    return (
        <table className="border-collapse border-2 border-slate-500 w-full">
            <thead>
                <tr>
                    {heads.map((head, index) => (
                        <th key={index} className="p-3 border border-slate-500">{head.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((row) => row) : <p className='p-3'>Tidak ada data</p>}
            </tbody>
        </table>
    )
}
