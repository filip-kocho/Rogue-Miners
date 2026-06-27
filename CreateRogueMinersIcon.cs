using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

internal static class CreateRogueMinersIcon
{
    private static int Main()
    {
        string input = "RogueMiners.jfif";
        string output = "RogueMiners.ico";
        int[] sizes = { 16, 32, 48, 64, 128, 256 };

        if (!File.Exists(input))
        {
            Console.Error.WriteLine("Missing " + input);
            return 1;
        }

        using (Image source = Image.FromFile(input))
        {
            int side = Math.Min(source.Width, source.Height);
            Rectangle srcRect = new Rectangle((source.Width - side) / 2, (source.Height - side) / 2, side, side);
            byte[][] pngs = new byte[sizes.Length][];

            for (int i = 0; i < sizes.Length; i++)
            {
                using (Bitmap bitmap = new Bitmap(sizes[i], sizes[i], PixelFormat.Format32bppArgb))
                using (Graphics graphics = Graphics.FromImage(bitmap))
                using (MemoryStream pngStream = new MemoryStream())
                {
                    graphics.Clear(Color.Transparent);
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.SmoothingMode = SmoothingMode.HighQuality;
                    graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    graphics.DrawImage(source, new Rectangle(0, 0, sizes[i], sizes[i]), srcRect, GraphicsUnit.Pixel);
                    bitmap.Save(pngStream, ImageFormat.Png);
                    pngs[i] = pngStream.ToArray();
                }
            }

            using (FileStream fs = new FileStream(output, FileMode.Create, FileAccess.Write))
            using (BinaryWriter writer = new BinaryWriter(fs))
            {
                writer.Write((ushort)0);
                writer.Write((ushort)1);
                writer.Write((ushort)sizes.Length);

                int offset = 6 + (16 * sizes.Length);
                for (int i = 0; i < sizes.Length; i++)
                {
                    writer.Write((byte)(sizes[i] >= 256 ? 0 : sizes[i]));
                    writer.Write((byte)(sizes[i] >= 256 ? 0 : sizes[i]));
                    writer.Write((byte)0);
                    writer.Write((byte)0);
                    writer.Write((ushort)1);
                    writer.Write((ushort)32);
                    writer.Write((uint)pngs[i].Length);
                    writer.Write((uint)offset);
                    offset += pngs[i].Length;
                }

                for (int i = 0; i < pngs.Length; i++)
                {
                    writer.Write(pngs[i]);
                }
            }
        }

        return 0;
    }
}
