"use client";

interface AdminPanelLayoutProps {
    children: React.ReactNode
}

const AdminPanelLayout = ({ children }: Readonly<AdminPanelLayoutProps>) => {

    return (
        <div>
            {children}
        </div>
    );
}

export default AdminPanelLayout;
