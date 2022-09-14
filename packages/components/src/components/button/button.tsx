import classNames from 'classnames';
import React, { HTMLProps, ReactNode } from 'react';
import ButtonLoading from './button_loading';
import Icon from '../icon';
import Text from '../text';

type TButtonGroupProps = HTMLProps<HTMLDivElement>;

type TButtonProps = HTMLProps<HTMLButtonElement> & {
    blue: boolean;
    classNameSpan: string;
    green: boolean;
    has_effect: boolean;
    icon: ReactNode;
    is_disabled: boolean;
    is_loading: boolean;
    is_circle: boolean;
    is_plus: boolean;
    is_submit_success: boolean;
    large: boolean;
    medium: boolean;
    primary: boolean;
    primary_light: boolean;
    rounded: boolean;
    secondary: boolean;
    small: boolean;
    tertiary: boolean;
    transparent: boolean;
    text: string;
    wrapperClassName: string;
    is_button_toggle: boolean;
    is_circular: boolean;
    type: 'button' | 'submit' | 'reset' | undefined;
    alternate: boolean;
    renderText: (param: ReactNode) => ReactNode;
};

const ButtonGroup = ({ children, className }: TButtonGroupProps) => (
    <div className={classNames('dc-btn__group', className)}>{children}</div>
);
const Button = ({
    blue,
    children,
    className = '',
    classNameSpan,
    green,
    has_effect,
    icon,
    id,
    is_disabled,
    is_loading,
    is_submit_success,
    is_button_toggle,
    is_circle,
    is_circular,
    is_plus,
    large,
    medium,
    onClick,
    rounded,
    tabIndex,
    text,
    wrapperClassName,
    type,
    primary,
    primary_light,
    secondary,
    alternate,
    transparent,
    small,
    tertiary,
    renderText,
    ...props
}: TButtonProps) => {
    const classes = classNames(
        'dc-btn',
        {
            'dc-btn__effect': has_effect,
            'dc-btn--primary': primary,
            'dc-btn--blue': blue,
            'dc-btn--secondary': secondary,
            'dc-btn--tertiary': tertiary,
            'dc-btn--primary__light': primary_light,
            'dc-btn--primary__blue': blue && primary,
            'dc-btn--tertiary__blue': blue && tertiary,
            'dc-btn--alternate': alternate,
            'dc-btn--green': green,
            'dc-btn__rounded': rounded,
            'dc-btn__large': large,
            'dc-btn__medium': medium,
            'dc-btn__small': small,
            'dc-btn__toggle': is_button_toggle,
            'dc-btn--plus': is_plus,
            'dc-btn--circle': is_circle,
            'dc-btn--circular': is_circular,
            'dc-btn--transparent': transparent,
        },
        className
    );
    const button = (
        <button
            id={id}
            className={classes}
            onClick={onClick || undefined}
            disabled={is_disabled}
            tabIndex={tabIndex || 0}
            type={is_submit_success ? 'button' : type || 'submit'}
            {...props}
        >
            {icon && <div className={classNames('dc-btn__icon', { 'dc-btn__icon--circle': is_circle })}>{icon}</div>}
            {text &&
                !(is_loading || is_submit_success) &&
                ((typeof renderText === 'function' && renderText(text[0].toUpperCase() + text.substr(1))) || (
                    <Text size='xs' weight='bold' align='center' className={classNames('dc-btn__text', classNameSpan)}>
                        {text[0].toUpperCase() + text.substr(1)}
                    </Text>
                ))}
            {is_loading && <ButtonLoading />}
            {is_submit_success && <Icon icon='IcCheckmark' color='active' size={24} />}
            {is_plus && <Icon icon='IcAddBold' color='black' size={18} />}
            {!text && !is_loading && children && (
                <Text size='xs' weight='bold' align='center' className={classNames('dc-btn__text', classNameSpan)}>
                    {children}
                </Text>
            )}
        </button>
    );
    const wrapper = <div className={wrapperClassName}>{button}</div>;

    return wrapperClassName ? wrapper : button;
};

Button.Group = ButtonGroup;

export default Button;
