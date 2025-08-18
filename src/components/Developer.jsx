import React, { useEffect, useRef, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';


const Developer = ({ animationName = 'idle', ...props }) => {
    const group = useRef();


    // Always call hooks unconditionally
    const gltf = useGLTF('/models/animations/developer.glb');
    const scene = gltf.scene;
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);

    const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
    const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
    const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
    const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');

    // Animation existence checks
    const idleAnim = idleAnimation && idleAnimation[0] ? { ...idleAnimation[0], name: 'idle' } : null;
    const saluteAnim = saluteAnimation && saluteAnimation[0] ? { ...saluteAnimation[0], name: 'salute' } : null;
    const clappingAnim = clappingAnimation && clappingAnimation[0] ? { ...clappingAnimation[0], name: 'clapping' } : null;
    const victoryAnim = victoryAnimation && victoryAnimation[0] ? { ...victoryAnimation[0], name: 'victory' } : null;

    // Filter out missing animations
    const animationClips = [idleAnim, saluteAnim, clappingAnim, victoryAnim].filter(Boolean);
    const { actions } = useAnimations(animationClips, group);

    useEffect(() => {
        if (actions && actions[animationName]) {
            actions[animationName].reset().fadeIn(0.5).play();
        }
        return () => {
            if (actions && actions[animationName]) {
                actions[animationName].fadeOut(0.5);
            }
        };
    }, [animationName, actions]);

    // Error handling after hooks
    if (!scene || !nodes || !materials) {
        return <div>Loading model...</div>;
    }

    return (
        <Suspense fallback={<span>Loading 3D character...</span>}>
            <group ref={group} {...props}>
                {nodes.Hips ? <primitive object={nodes.Hips} /> : null}
                {nodes.Wolf3D_Hair && materials.Wolf3D_Hair && (
                    <skinnedMesh
                        geometry={nodes.Wolf3D_Hair.geometry}
                        material={materials.Wolf3D_Hair}
                        skeleton={nodes.Wolf3D_Hair.skeleton}
                    />
                )}
                {nodes.Wolf3D_Glasses && materials.Wolf3D_Glasses && (
                    <skinnedMesh
                        geometry={nodes.Wolf3D_Glasses.geometry}
                        material={materials.Wolf3D_Glasses}
                        skeleton={nodes.Wolf3D_Glasses.skeleton}
                    />
                )}
                {nodes.Wolf3D_Body && materials.Wolf3D_Body && (
                    <skinnedMesh
                        geometry={nodes.Wolf3D_Body.geometry}
                        material={materials.Wolf3D_Body}
                        skeleton={nodes.Wolf3D_Body.skeleton}
                    />
                )}
                {nodes.Wolf3D_Outfit_Bottom && materials.Wolf3D_Outfit_Bottom && (
                    <skinnedMesh
                        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                        material={materials.Wolf3D_Outfit_Bottom}
                        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                    />
                )}
                {nodes.Wolf3D_Outfit_Footwear && materials.Wolf3D_Outfit_Footwear && (
                    <skinnedMesh
                        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                        material={materials.Wolf3D_Outfit_Footwear}
                        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                    />
                )}
                {nodes.Wolf3D_Outfit_Top && materials.Wolf3D_Outfit_Top && (
                    <skinnedMesh
                        geometry={nodes.Wolf3D_Outfit_Top.geometry}
                        material={materials.Wolf3D_Outfit_Top}
                        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                    />
                )}
                {nodes.EyeLeft && materials.Wolf3D_Eye && (
                    <skinnedMesh
                        name="EyeLeft"
                        geometry={nodes.EyeLeft.geometry}
                        material={materials.Wolf3D_Eye}
                        skeleton={nodes.EyeLeft.skeleton}
                        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary || {}}
                        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences || []}
                    />
                )}
                {nodes.EyeRight && materials.Wolf3D_Eye && (
                    <skinnedMesh
                        name="EyeRight"
                        geometry={nodes.EyeRight.geometry}
                        material={materials.Wolf3D_Eye}
                        skeleton={nodes.EyeRight.skeleton}
                        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary || {}}
                        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences || []}
                    />
                )}
                {nodes.Wolf3D_Head && materials.Wolf3D_Skin && (
                    <skinnedMesh
                        name="Wolf3D_Head"
                        geometry={nodes.Wolf3D_Head.geometry}
                        material={materials.Wolf3D_Skin}
                        skeleton={nodes.Wolf3D_Head.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary || {}}
                        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences || []}
                    />
                )}
                {nodes.Wolf3D_Teeth && materials.Wolf3D_Teeth && (
                    <skinnedMesh
                        name="Wolf3D_Teeth"
                        geometry={nodes.Wolf3D_Teeth.geometry}
                        material={materials.Wolf3D_Teeth}
                        skeleton={nodes.Wolf3D_Teeth.skeleton}
                        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary || {}}
                        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences || []}
                    />
                )}
            </group>
        </Suspense>
    );
};


useGLTF.preload('/models/animations/developer.glb');


Developer.propTypes = {
    animationName: PropTypes.string,
};

export default Developer;