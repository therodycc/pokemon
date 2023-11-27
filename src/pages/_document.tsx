import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript
} from "next/document";
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
                        crossOrigin="anonymous"
                    />
                    {/* <link
                        href={"/assets/css/styles.css"}
                        rel="stylesheet"
                        type="text/css"
                    /> */}

                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <script src="https://kit.fontawesome.com/2e2971d45d.js" crossOrigin="anonymous"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
