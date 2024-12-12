import {defineConfig, UserConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

const path = require('path')

export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        define: {
            'process.env': env
        },
        plugins: [react()],
        server: {
            port: 3000,
        },
        resolve: {
            alias: {
                src: "/src",
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern'
                }
            }
        },
        build: {
            sourcemap: true,
            target: 'esnext',
            minify: false,
            lib: {
                entry: path.resolve(__dirname, 'src/index.tsx'),
                name: 'life-media',
                fileName: format => `life-media.${format}.js`
            },
            rollupOptions: {
                external: ['@mui/material'],
                output: {
                    sourcemapExcludeSources: true,
                    globals: {
                        react: 'React',
                        '@mui/material/InputAdornment': 'InputAdornment',
                        '@mui/material/TextField': 'TextField',
                        '@mui/material/IconButton': 'IconButton',
                        '@mui/material/styles': 'styles',
                        'react/jsx-runtime': 'jsxRuntime',
                        '@mui/material/Menu': 'Menu',
                        '@mui/material/MenuItem': 'MenuItem',
                        '@mui/material/Typography': 'Typography',
                        '@mui/material/ListItemIcon': 'ListItemIcon',
                        '@mui/material/ListItemText': 'ListItemText'
                    }
                }
            }
        },
    } satisfies  UserConfig
});
