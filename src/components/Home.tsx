import { useState, useEffect } from 'react';
import './Home.css';

type DataState = {
    title: string;
    description: string;
}[];

const Home = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const [data, setData] = useState<DataState>(() => {
        const storedData = localStorage.getItem('data');
        try {
            const parsedData = storedData ? JSON.parse(storedData) : [];
            return Array.isArray(parsedData) ? parsedData : [];
        } catch (error) {
            console.error('Error parsing data from localStorage', error);
            return [];
        }
    });

    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;


    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = filteredData.slice(firstItemIndex, lastItemIndex); 

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const newTitle = (e.target).title.value;
        const newDescription = (e.target).description.value;


        setData((prevData) => [...prevData, { title: newTitle, description: newDescription }]);

        e.target.title.value = '';
        e.target.description.value = '';
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        setCurrentPage(1);  
    };

    const handleRemove = (index: number) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    // Pagination functions
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="home-container">
            {isLoggedIn ? (
                <div className='flex flex-col items-center gap-6 p-[20px]'>
                    <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
                        <input className='w-full p-1 rounded-sm text-md min-w-[300px] shadow-md opacity-85 blur-[0.5px] outline-none font-semibold' type="text" name="title" placeholder="Enter title" />
                        <textarea className='w-full resize-none p-1 rounded-sm text-md min-w-[300px] min-h-[240px] shadow-md opacity-85 blur-[0.5px] outline-none font-semibold bg-[#ffffff]' name="description" id="description" placeholder="Enter description"></textarea>
                        <button className='text-white bg-gray-900 font-semibold px-4 py-1 rounded-md' type="submit">+ Add</button>
                    </form>
                    
                    {/* Search form */}
                    <form className='flex items-center gap-5' onSubmit={handleSearch}>
                        <input type="text" name='search'value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-1 outline-none rounded-md" />
                        <button className='text-white bg-gray-900 font-semibold px-4 py-1 rounded-md' type="submit">Search</button>
                    </form>

                    {/* Table */}
                    <div className='bg-[#ffffff90] p-2 rounded-sm flex flex-col items-center'>
                        <table className='min-w-full table-auto'>
                            <thead>
                                <tr className='bg-[#ffffee90]'>
                                    <th className='px-6 py-3 text-left'>Title</th>
                                    <th className='px-6 py-3 text-left'>Description</th>
                                    <th className='px-6 py-3 text-left'>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className='px-6 py-3'>{item.title}</td>
                                        <td className='px-6 py-3 max-w-xs break-words'>{item.description}</td>
                                        <td className='px-6 py-3'>
                                            <button className='bg-red-500 text-white font-semibold px-3 py-1 rounded-md' onClick={() => handleRemove(index)}>x</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        {filteredData.length > 0 && (
                            <div className="pagination mt-4 flex justify-center items-center gap-5">
                                <button onClick={handlePrevPage} className="px-4 py-1 text-white bg-gray-900 font-semibold rounded-md" disabled={currentPage === 1}>Previous</button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button onClick={handleNextPage} className="px-4 py-1 text-white bg-gray-900 font-semibold rounded-md" disabled={currentPage === totalPages}>Next</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>Please log in to see the content.</div>
            )}
        </div>
    );
};

export default Home;
