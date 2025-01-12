import { redirect } from 'next/navigation';

const AdminPanelPage = () => {
    return (
        redirect('/adminPanel/login')
    )
}

export default AdminPanelPage
