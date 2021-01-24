import React, {useContext, useEffect} from 'react';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

import AuthContext from '../contexts/auth';

const AppStack = () => {
    const { signed } = useContext(AuthContext)

    return (
        signed ? <AppRoutes /> : <AuthRoutes/>
    )
}

export default AppStack;