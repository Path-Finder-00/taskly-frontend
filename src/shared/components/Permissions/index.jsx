import { createContext, useContext, useState, useEffect } from 'react';
import permissionsService from '@/App/services/permissions'

const PermissionContext = createContext(null);

export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionProvider');
    }
    return context;
};

export const PermissionProvider = ({ user, children }) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const permission = user ? await permissionsService.getPermissions() : [];
                setPermissions(permission)
            } catch (error) {
                console.error("Error while fetching users's permissions: ", error)
            } 
        }
        fetchData()
    }, [user])

    return (
        <PermissionContext.Provider value={permissions} >
            {children}
        </PermissionContext.Provider>
    );
};
