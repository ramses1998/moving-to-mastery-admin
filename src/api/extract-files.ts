
export const extractFilesAPI = async (): Promise<void> => {
    await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/extract-files")
}
