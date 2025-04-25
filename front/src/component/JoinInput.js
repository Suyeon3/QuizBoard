export default function JoinInput({label, name, value, type, placeholder, onChange}) {
    return (
        <label>
            {label}
            <input
                type={type}
                name={name}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </label>
    )
}