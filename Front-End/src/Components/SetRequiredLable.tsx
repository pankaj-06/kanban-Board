
export default function SetRequiredLable(labelName: string) {
    return (
        <div>
            {labelName}
            <span style={{ color: "red" }}> *</span>
        </div>
    )
}
