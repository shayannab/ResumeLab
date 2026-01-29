import './StarBorder.css';

const StarBorder = ({
    as: Component = 'button',
    className = '',
    color = 'white',
    speed = '6s',
    children,
    ...rest
}) => {
    return (
        <Component
            className={`star-border-container ${className}`}
            {...rest}
        >
            <div
                className="star-border-overlay"
                style={{
                    '--border-color': color,
                    '--animation-speed': speed
                }}
            />
            <div className="star-border-content">{children}</div>
        </Component>
    );
};

export default StarBorder;
