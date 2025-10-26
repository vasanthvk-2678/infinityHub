import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("ERROR: Context");
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 4000)); //timeout to show skeleton

            const usersResponse = await fetch('/data/users.json');
            console.log(usersResponse);

            if (!usersResponse.ok) throw new Error('Failed to load users');
            const usersData = await usersResponse.json();
            console.log(usersData);

            setUsers(usersData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        users,
        loading,
        error,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
