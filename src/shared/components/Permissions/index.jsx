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
        user ? permissionsService.getPermissions().then(permissions => setPermissions(permissions)) : [];
    }, [user])

    return (
        <PermissionContext.Provider value={permissions} >
            {children}
        </PermissionContext.Provider>
    );
};
