const avatars = [
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F1-01.png?alt=media&token=066cdb20-958a-44a1-b50e-599173d66f6f`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F2-01.png?alt=media&token=0f4dc9ae-6f36-4d77-98cb-da0e9036891f`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F3-01.png?alt=media&token=d0ad254c-c07a-4441-bcde-ab51efb6bd01`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F4-01.png?alt=media&token=ca46ae6a-4a84-4ba4-b2c5-8dea414823dc`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F5-01.png?alt=media&token=e6316e38-a87f-4ccf-986e-0f352116dcbb`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F6-01.png?alt=media&token=5db5385f-5e1f-4b4e-bb98-639ed6678dfd`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F7-01.png?alt=media&token=a8c4cc70-2aec-4592-bafb-273e0552f700`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F8-01.png?alt=media&token=8c749886-c6ec-4e29-a5dd-865eb9cfc0e3`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F9-01.png?alt=media&token=5e932a91-97de-42ae-a525-205a55e7131e`,
    `https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/isometric%2F9-01.png?alt=media&token=5e932a91-97de-42ae-a525-205a55e7131e`
]

const alert = "https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/Alert.png?alt=media&token=155ffed2-dc13-43fe-93fd-39160cc60e71"
const search = "https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/1120403-200.png?alt=media&token=ef0c0f19-7de0-40a0-a293-2c955bb7c6cf"
const cancel = "https://firebasestorage.googleapis.com/v0/b/decodemtl-nsu.appspot.com/o/1121796-200.png?alt=media&token=58d0a72a-e8ad-45e7-927f-c6036080ddfa"

const _returnImage = (percentage) => {
    return (
        percentage === 100 ? avatars[9] :
            percentage > 90 ? avatars[8] :
                percentage > 80 ? avatars[7] :
                    percentage > 70 ? avatars[6] :
                        percentage > 60 ? avatars[5] :
                            percentage > 50 ? avatars[4] :
                                percentage > 40 ? avatars[3] :
                                    percentage > 30 ? avatars[2] :
                                        percentage > 20 ? avatars[1] :
                                            avatars[0]
    )

}

export default avatars;
export { _returnImage, alert, search, cancel };