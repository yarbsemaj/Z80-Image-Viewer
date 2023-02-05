# Z80-Image-Viewer

A simple program to view compressed 2bpp 32x32 compressed images on a RC2014 compatible SBC.


## How to create an image
1. Create a 32x32, index colour, image using the pallet provided, this can be done in an image editor like GIMP
2. Export the image in the RAW format, e.g. `image.raw`
3. Feed the image into the js file provided, this will convert the 1 Byte per pixel image to 2 bytes per pixel e.g. `image.out`
4. Use https://github.com/einar-saukas/ZX0, to compress this file further. e.g. `image.bin`
5. Use `zmac main.asm` to build your combined image data+decoder program. 
The example image and decoder program are only 338 bytes
