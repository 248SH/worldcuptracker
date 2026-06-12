const PageContainer = ({ children }) => {
    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '16px' }}>
            {children}
        </div>
    )
}

export default PageContainer