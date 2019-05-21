{
    'targets': [
        {
            'target_name': 'PARSER',
            'sources': ['parse_wrap.cxx', 'libdata.cxx'],
            'include_dirs': ['./'],
            'conditions': [
                ["OS=='win'", {
                    'configurations': {
                        'Release': {'msvs_settings': {
                            'VCCLCompilerTool': {
                                'AdditionalOptions': [
                                    '/EHsc'
                                ]
                            }
                        }
                        },
                        'Debug':{'msvs_settings': {
                            'VCCLCompilerTool': {
                                'AdditionalOptions': [
                                    '/EHsc'
                                ]
                            }
                        }
                        }
                    },
                },
                    "OS=='linux'", {
                    'cflags_cc': ['-fexceptions']
                }
                ]
            ]
        }
    ]
}
