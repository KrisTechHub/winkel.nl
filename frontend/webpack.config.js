import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// import CopyWebpackPlugin from 'copy-webpack-plugin'
// const envPath = `.env.${process.env.NODE_ENV}`;
// require(dotenv).config({ path: envPath})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    //This property defines where the application starts
    entry: './src/main.jsx',

    //This property defines the file path and the file name which will be used for deploying the bundled file
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },

    //Setup loaders
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/, // Match both .js and .jsx files
                // include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                test: /\.css$/i, // Match CSS files 
                include: path.resolve(__dirname),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    tailwindcss,
                                    autoprefixer
                                ]
                            }
                        }
                    }] // Use style-loader and css-loader
            },
            {
                test: /\.pdf$/, //FILE
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/pdf/', // Output path for PDF files
                        },
                    },
                ],
            },
            {
                test: /\.(svg|jpe?g|jpg|png|webp)$/i, //MEDIA
                type: 'asset/resource',   
                generator: {
                    filename: 'images/[name][ext]' // Output filename pattern
                }           
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i, //FONTS
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]' // Output filename pattern
                }
            },
            {
                test: /\.m?js$/,
                resolve: {
                  fullySpecified: false,
                },
            },
        ]
    },

    // Setup plugin to use a HTML file for serving bundled js files
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            // favicon: './public/favicon.svg'
        }),
        new Dotenv({
            // path: `./.env.${process.env.NODE_ENV}`, // Load specific .env file based on NODE_ENV
            systemVars: true,
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: './src/assets/kris.svg' },
        //     ]
        // })
    ],

    // Set webpack mode to development or production
    mode: process.env.NODE_ENV || 'development',

    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        historyApiFallback: true
    },


    resolve: {
        extensions: ['.js', '.jsx', '.css'], // Specify file extensions to resolve
        alias: {
            // Create aliases for frequently used paths
            '@components': path.resolve(__dirname, 'src', 'Components'),
            // Add more aliases as needed for your project
        },
        
    },
    // watch: true,
};

export default config;
