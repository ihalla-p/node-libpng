import { colorRGB, isColorRGB } from "../rgb";
import { colorGrayScale } from "../gray-scale";

describe("The utilities for palette colors", () => {
    it("creates a gray scale alpha color", () => {
        const color = colorRGB(50, 100, 150);
        expect(color.r).toBe(50);
        expect(color.g).toBe(100);
        expect(color.b).toBe(150);
        expect(color).toEqual([50, 100, 150]);
    });

    describe("checking if a given input is an indexed color", () => {
        [
            undefined,
            null,
            10,
            "string",
            false,
            true,
            [],
            {},
            [1, 2],
            colorGrayScale(50),
        ].forEach(input => {
            it(`detects "${JSON.stringify(input)}" as false`, () => {
                expect(isColorRGB(input)).toBe(false);
            });
        });

        it("detects a correct input as true", () => {
            expect(isColorRGB(colorRGB(40, 100, 120))).toBe(true);
        });
    });
});
