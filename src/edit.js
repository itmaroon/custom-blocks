
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps,
	RichText,
	AlignmentControl, 
	BlockControls,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	
	const { content, align, backgroundColor, textColor, cbLink, linkLabel, hasLinkNofollow} = attributes;
	const onChangeContent = ( newContent) => {
		setAttributes( {content:newContent} )
	}
	const onChangeAlign = ( newAlign ) => {
		setAttributes( { 
			align: newAlign === undefined ? 'none' : newAlign, 
		} )
	}
	const onChangeTextColor = (newTextcolor) => { 
		setAttributes( { textColor: newTextcolor } )	
	}
	const onChangeBackgroundColor = (newBackgroundColor) => {
		setAttributes( { backgroundColor: newBackgroundColor } ) 
	}
	const onChangeCbLink = ( newcbLink ) => {
		setAttributes( { cbLink: newcbLink === undefined ? '' : newcbLink } )
	}
	
	const onChangeLinkLabel = ( newLinkLabel ) => {
		setAttributes( { linkLabel: newLinkLabel === undefined ? '' : newLinkLabel } )
	}
	
	const toggleNofollow = () => {
		setAttributes( { hasLinkNofollow: ! hasLinkNofollow } )
	}

	const blockProps = useBlockProps( {
		className: `has-text-align-${ align }`
	} );


	return (
		<>
			<InspectorControls>
				<PanelColorSettings 
					title={ __( 'Color settings', 'cb_location' ) }
					initialOpen={ false }
					colorSettings={ [
						{
						  value: textColor,
						  onChange: onChangeTextColor,
						  label: __( 'Text color', 'cb_location' )
						},
						{
						  value: backgroundColor,
						  onChange: onChangeBackgroundColor,
						  label: __( 'Background color', 'cb_location' )
						}
					] }
				/>
				<PanelBody 
					title={ __( 'Link Settings', 'cb_location')}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'CB link', 'cb_location' )}
								value={ cbLink }
								onChange={ onChangeCbLink }
								help={ __( 'Add your Academy link', 'cb_location' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__( 'Link label', 'cb_location' )}
								value={ linkLabel }
								onChange={ onChangeLinkLabel }
								help={ __( 'Add link label', 'cb_location' )}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								help={
									hasLinkNofollow
										? 'Has rel nofollow.'
										: 'No rel nofollow.'
								}
								checked={ hasLinkNofollow }
								onChange={ toggleNofollow }
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentControl
					value={ attributes.align }
					onChange={ onChangeAlign }
				/>
			</BlockControls>

			<div 
				{ ...blockProps }
				style={ { backgroundColor: backgroundColor } }
			>
				<RichText
					tagName="p"
					onChange={ onChangeContent }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					value={ content }
					placeholder={ __( 'Write your text...' ) }
					style={ { textAlign: align, backgroundColor: backgroundColor, color: textColor } }
				/>
				<ExternalLink 
					href={ cbLink }
					className="cb-button"
					rel={ hasLinkNofollow ? "nofollow" : "" }
				>
					{ linkLabel }
				</ExternalLink>
			</div>
		</>
	);
}
