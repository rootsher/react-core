import { makeRequest } from "./makeRequest";

describe("makeRequest()", () => {
    const mockedFetch = jest.spyOn(global, "fetch");

    afterAll(() => {
        mockedFetch.mockRestore();
    });

    beforeEach(() => {
        mockedFetch.mockReset().mockResolvedValue(new Response());
    });

    it("should call fetch with given url", async () => {
        await makeRequest("/url");

        expect(mockedFetch).toBeCalledWith("/url", expect.any(Object));
    });

    it("should call fetch with default method", async () => {
        await makeRequest("/url");

        expect(mockedFetch).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "GET",
            })
        );
    });

    it("should call fetch with given method", async () => {
        await makeRequest("/url", { method: "POST" });

        expect(mockedFetch).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "POST",
            })
        );
    });

    it.todo("should call fetch with default content type header");
    it.todo("should call fetch with authorization header");
    it.todo("when request method is GET should not add body");

    describe("when query params given", () => {
        it("should add stringified params to request url", async () => {
            await makeRequest("/url", {
                params: {
                    parameter1: "parameter1Value",
                    parameter2: ["value1", "value2"],
                },
            });

            expect(mockedFetch).toBeCalledWith(
                "/url?parameter1=parameter1Value&parameter2%5B0%5D=value1&parameter2%5B1%5D=value2",
                expect.any(Object)
            );
        });

        it("should append stringified params to request url when given input already has parameters", async () => {
            await makeRequest("/url?parameter1=parameter1Value", {
                params: {
                    parameter2: "parameter2Value",
                },
            });

            expect(mockedFetch).toBeCalledWith(
                "/url?parameter1=parameter1Value&parameter2=parameter2Value",
                expect.any(Object)
            );
        });
    });

    // TODO(poc: rootsher@gmail.com, 20-06-2022): tests for multipart/form-data requests
});
