const PageContainer = ({ children }) => {
    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: 'clamp(8px, 4vw, 32px)'
        }}>
            {children}
        </div>
    )
}

export default PageContainer