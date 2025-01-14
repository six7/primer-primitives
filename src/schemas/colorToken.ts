import {z} from 'zod'
import {colorHexValue} from './colorHexValue'
import {referenceValue} from './referenceValue'
import {alphaValue} from './alphaValue'
import {baseToken} from './baseToken'
import {collection, mode} from './collections'
import {scopes} from './scopes'
import {tokenType} from './tokenType'

export const colorToken = baseToken
  .extend({
    $value: z.union([colorHexValue, referenceValue]),
    $type: tokenType('color'),
    alpha: alphaValue.optional().nullable(),
    mix: z
      .object({
        color: z.string(),
        weight: z.number().min(0).max(1),
      })
      .nullable()
      .optional(),
    $extensions: z
      .object({
        'org.primer.figma': z.object({
          collection: collection([
            'base/color/light',
            'base/color/dark',
            'base/color/dark-dimmed',
            'mode',
            'pattern/mode',
          ]).optional(),
          mode: mode(['light', 'dark']).optional(),
          scopes: scopes(['all', 'bgColor', 'fgColor', 'borderColor']).optional(),
        }),
      })
      .optional(),
  })
  .strict()
